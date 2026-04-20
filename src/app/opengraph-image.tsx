import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <p
          style={{
            color: "#525252",
            fontSize: "24px",
            margin: 0,
            fontFamily: "system-ui",
            letterSpacing: "0.05em",
          }}
        >
          koulant.com
        </p>
        <h1
          style={{
            color: "#fafafa",
            fontSize: "80px",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1,
            fontFamily: "system-ui",
          }}
        >
          {profile.name}
        </h1>
        <p
          style={{
            color: "#a3a3a3",
            fontSize: "36px",
            margin: 0,
            fontFamily: "system-ui",
          }}
        >
          {profile.role}
        </p>
      </div>
    </div>,
    size
  );
}
