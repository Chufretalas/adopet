import { verifyJWT } from "@/actions/account";
import jsonResponse from "@/util/json_response";

export async function POST(req: Request, res: Response) {

    const tokenHeader = req.headers.get('authorization')

    if (tokenHeader) {
        const splitHeader = tokenHeader.split(" ")
        const token = splitHeader[splitHeader.length - 1]

        const payload = await verifyJWT(token)

        if (payload) {
            return jsonResponse(200, payload)
        }
    }

    return jsonResponse(401, { message: "Bad jwt token, please try again or re-login to get a new token. Note that the token should be sent in the Bearer Token Authentication Header of the request, example: https://reqbin.com/req/h4rnefmw/post-json-with-bearer-token-authorization-header" })
}