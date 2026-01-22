import { parafinAPI } from './src/api/parafin';

async function main() {
  const productOfferId = 'capital_product_offer_id_2b52fcfa-3bfd-4531-87de-2e37e3e74a80';
  
  try {
    console.log(`Fetching capital product offer ${productOfferId}...`);
    const offer = await parafinAPI.getCapitalProductOffer(productOfferId);
    console.log('\nCapital Product Offer:');
    console.log(JSON.stringify(offer, null, 2));
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
