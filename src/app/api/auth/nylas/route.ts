import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";

export async function GET() {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId,
    redirectUri: nylasConfig.redirectUri,
    provider: "google",
    accessType: "offline",
  });

  return redirect(authUrl);
}
