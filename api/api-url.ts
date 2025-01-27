import { applicationSettings } from "../constants";

const baseUrl = applicationSettings.VIKING_API;
// const baseUrl = 'https://api-dev.elocal.com'

export const gtvUrl = `${baseUrl}/gtv/billing-account`;

export const gtvPaymentUrl = `${baseUrl}/gtv/payment`;

export const gtvInvoice = `${baseUrl}/gtv/invoice`;

export const accountUrl = `${baseUrl}/account-management`;

export const listingProcessorUrl = `${baseUrl}/listing-processor`;

export const indexerUrl = `${baseUrl}/viking-indexer`;

export const accountListUrl = `${baseUrl}/api/rest`;

export const typeAheadUrl = `${baseUrl}/type-ahead`;

export const salesForceUrl = `${baseUrl}/ad-portal/advprtl/accounts`;

export const salesForceBaseUrl = `${baseUrl}/ad-portal/advprtl`;

export default baseUrl;
