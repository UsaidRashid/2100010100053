const axios = require('axios');

module.exports.getTopProducts = async (req,res) => {
  console.log(req.params);
  const { categoryname, top, minPrice, maxPrice } = req.params;

  if (!categoryname || !top || !minPrice || !maxPrice) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

    const apiUrls = [`http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
                    `http://20.244.56.144/test/companies/SNP/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
                    `http://20.244.56.144/test/companies/AZO/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
                    `http://20.244.56.144/test/companies/MYN/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
                    `http://20.244.56.144/test/companies/FLP/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
            ];
    const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIyMDU5NTA3LCJpYXQiOjE3MjIwNTkyMDcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImNlNzAwYjk4LTdiOTMtNDdhYS05MzAwLWY1OTkyZmMxOGYwOSIsInN1YiI6InJhc2hpZHVzYWlkMkBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJBbmFuZEVuZ2luZWVyaW5nQ29sbGVnZUFncmEiLCJjbGllbnRJRCI6ImNlNzAwYjk4LTdiOTMtNDdhYS05MzAwLWY1OTkyZmMxOGYwOSIsImNsaWVudFNlY3JldCI6InRRVGticVV1eXhOR2tSZXIiLCJvd25lck5hbWUiOiJVc2FpZFJhc2hpZCIsIm93bmVyRW1haWwiOiJyYXNoaWR1c2FpZDJAZ21haWwuY29tIiwicm9sbE5vIjoiMjEwMDAxMDEwMDA1MyJ9.6f9LZE2EcwQGo26W7_G52LnaAtFuNbwpJQZ_PnuS5Dg"
    
    const responses = [];

    for (const url of apiUrls) {
        try {
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${BEARER_TOKEN}`
            }
          });
          responses.push({
            url,
            data: response.data
          });
        } catch (error) {
          console.error(`Error fetching from ${url}:`, error.message);
          responses.push({
            url,
            error: error.message
          });
        }
    }
    return res.status(200).json(responses);
};