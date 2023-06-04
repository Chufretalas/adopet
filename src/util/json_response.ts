export default function jsonResponse(status: number, body: any) {
    return new Response(JSON.stringify(body), {status: status})
}