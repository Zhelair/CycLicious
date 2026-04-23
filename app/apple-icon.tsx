import {ImageResponse} from "next/og";

export const contentType = "image/png";
export const size = {
  width: 180,
  height: 180
};

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, rgba(18,116,255,0.22) 0%, rgba(237,244,251,1) 38%, rgba(246,236,221,1) 100%)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 128,
            height: 128,
            borderRadius: 36,
            background: "rgba(255,255,255,0.92)",
            border: "2px solid rgba(15,24,34,0.08)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 999,
              background: "linear-gradient(135deg, #1274ff, #e3a43a)",
              color: "#ffffff",
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: "-0.06em"
            }}
          >
            BS
          </div>
        </div>
      </div>
    ),
    size
  );
}
