"use server";

import base64 from "base-64";

const ZOOM_ACCOUNT_ID = "rq1w83k-ToOO_nvz_lHQAQ";
const ZOOM_CLIENT_ID = "f89zcIuSCjf9annSkFAw";
const ZOOM_CLIENT_SECRET = "JszeYibgT185mDitGOfFoyRmOsSxM0Fj";

const getAuthHeaders = () => {
  return {
    Authorization: `Basic ${base64.encode(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`)}`,
    "Content-Type": "application/json",
  };
};

export const generateZoomAccessToken = async () => {
  try {
    const response = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
      {
        method: "POST",
        headers: getAuthHeaders(),
      },
    );

    const jsonResponse = await response.json();

    return jsonResponse.access_token ?? "";
  } catch (error) {
    console.log("gnerateZoomAccessToken ERROR: >>", error);
    throw error;
  }
};

export const generateZoomMeeting = async () => {
  const now = new Date();
  const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);
  const access_token = await generateZoomAccessToken();

  console.log("ACCESS_TOKEN_RESPONSE", access_token);

  const response = await fetch(`https://api.zoom.us/v2/users/me/meetings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      agenda: "Testing Zoom",
      duration: 60,
      schedule_for: "monir.bdcalling@gmail.com",
      calendar_type: 2,
      join_before_host: false,
      meeting_invitees: [
        {
          email: "monirhrabby.personal@gmail.com",
        },
      ],
      registrants_confirmation_email: true,
      registrants_email_notification: true,
      registration_type: 2,
      start_time: fiveMinutesLater.toDateString(),
      topic: "Explore thhe freelancePM Intregation",
      type: 2,
    }),
  }).then((res) => res.json());

  console.log("meeting", response);
};
