import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductsListClient from "@/components/ProductsListClient";

interface SearchParams {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}

async function getProducts(params: SearchParams) {
  await dbConnect();
  
  // 1. CLEANUP LOGIC: Remove any accidental products that contain environment variables
  await Product.deleteMany({
    name: { $regex: /MONGODB_|suryaghosh|y02nehKTZwEom2bt/i }
  });

  // 2. Build Backend Query
  const query: Record<string, unknown> = {};

  // Omnibox Search: Name, Price, Date
  if (params.search) {
    const searchString = params.search;
    const searchConditions: Record<string, unknown>[] = [
      { name: { $regex: searchString, $options: "i" } } // Search by Name
    ];

    // Check if the search string is a valid number to search by Price
    const numericSearch = Number(searchString);
    if (!isNaN(numericSearch)) {
      searchConditions.push({ price: numericSearch });
    }

    // Check if the search string can be parsed as a date to search by Date
    // Using a loose check. If it's a valid date string, search the day.
    const dateSearch = new Date(searchString);
    if (!isNaN(dateSearch.getTime())) {
      // Create a date range for the entire day to match timestamps
      const startOfDay = new Date(dateSearch);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(dateSearch);
      endOfDay.setHours(23, 59, 59, 999);

      searchConditions.push({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });
    }

    query.$or = searchConditions;
  }

  // Filter by price range
  if (params.minPrice || params.maxPrice) {
    const priceQuery: Record<string, number> = {};
    if (params.minPrice) priceQuery.$gte = Number(params.minPrice);
    if (params.maxPrice) priceQuery.$lte = Number(params.maxPrice);
    query.price = priceQuery;
  }

  // 3. Backend Sorting
  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
  if (params.sort === "price_asc") sortOption = { price: 1 };
  if (params.sort === "price_desc") sortOption = { price: -1 };
  if (params.sort === "oldest") sortOption = { createdAt: 1 };

  const products = await Product.find(query).sort(sortOption).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const products = await getProducts(params);

  return <ProductsListClient initialProducts={products} />;
}
