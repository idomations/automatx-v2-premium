import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "AutomatX - הופך עסקים לנבונים";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          padding: "64px",
          background:
            "radial-gradient(circle at 20% 20%, rgba(212,175,55,.22), transparent 40%), linear-gradient(135deg, #FDFBF7 0%, #F5F0E8 45%, #EDE5D6 100%)",
          color: "#1A1410",
        }}
      >
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            marginBottom: 14,
            lineHeight: 1.2,
            textAlign: "right",
            direction: "rtl",
          }}
        >
          אוטומטX
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 600,
            color: "#7A5D12",
            textAlign: "right",
            direction: "rtl",
          }}
        >
          הופך עסקים לנבונים
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
