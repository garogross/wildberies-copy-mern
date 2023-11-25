import {fileURLToPath} from 'url'
import {dirname} from "path"

const __filename = fileURLToPath(import.meta.url);
export const DIRNAME = dirname(__filename);

export const userRoles = {
    buyer: "buyerZ",
    admin: "adminZ",
    seller: "sellerZ",
    guide: "guideZ"
}