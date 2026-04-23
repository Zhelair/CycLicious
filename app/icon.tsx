import {ImageResponse} from "next/og";

export const contentType = "image/png";
export const size = {
  width: 512,
  height: 512
};

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(145deg, rgba(18,116,255,0.2) 0%, rgba(237,244,251,1) 38%, rgba(246,236,221,1) 100%)"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            borderRadius: 96,
            border: "2px solid rgba(15,24,34,0.08)",
            background:
              "radial-gradient(circle at top left, rgba(18,116,255,0.16), transparent 34%), radial-gradient(circle at bottom right, rgba(227,164,58,0.2), transparent 36%), rgba(255,255,255,0.8)"
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 240,
            height: 240,
            borderRadius: 999,
            border: "18px solid #0f1822",
            boxShadow: "0 22px 48px rgba(15,24,34,0.14)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 164,
              height: 164,
              borderRadius: 999,
              background: "linear-gradient(135deg, #1274ff, #e3a43a)",
              color: "#ffffff",
              fontSize: 84,
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
