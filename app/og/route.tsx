import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Lars van der Niet";

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full bg-white"
        style={{ fontFamily: "sans-serif" }}
      >
        {/* Top accent bar */}
        <div tw="flex w-full h-2 bg-black" />

        {/* Main content */}
        <div tw="flex flex-col flex-1 justify-between px-16 py-14">
          {/* Title */}
          <div tw="flex flex-col">
            <p
              tw="text-sm text-gray-400 mb-4 tracking-widest uppercase"
              style={{ letterSpacing: "0.15em" }}
            >
              larsniet.com
            </p>
            <h1
              tw="text-6xl font-bold text-black leading-tight"
              style={{ lineHeight: 1.15, maxWidth: "900px" }}
            >
              {title}
            </h1>
          </div>

          {/* Footer row */}
          <div tw="flex items-center justify-between">
            <div tw="flex items-center">
              <div tw="flex flex-col">
                <p tw="text-xl font-semibold text-black m-0">Lars van der Niet</p>
                <p tw="text-base text-gray-400 m-0">Full-stack developer · Amsterdam</p>
              </div>
            </div>
            <p tw="text-base text-gray-300" style={{ letterSpacing: "0.05em" }}>
              larsniet.com/journey
            </p>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div tw="flex w-full h-1 bg-gray-100" />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
