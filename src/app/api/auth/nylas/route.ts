import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";

export async function GET() {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId,
    redirectUri: nylasConfig.redirectUri,
    // @ts-ignore
    provider: "zoom",
    responseType: "code",
    accessType: "offline",
  });

  // const authUrl = `https://api.us.nylas.com/v3/connect/auth?
  // client_id=${nylasConfig.clientId}
  // &redirect_uri=${nylasConfig.redirectUri}  // Your application's callback_uri.
  // &response_type=code
  // &access_type=offline
  // &provider=zoom`;

  return redirect(authUrl);
}
