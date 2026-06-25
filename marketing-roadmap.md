# Essence Noble Marketing Roadmap

## Technical Standard

- Publish on HTTPS with one clean domain.
- Replace every `https://YOUR-DOMAIN.com/` value in `merchant-feed-template.csv` after launch.
- Add the final domain to Open Graph image URLs if the sharing preview needs stricter platform support.
- Submit the live URL and sitemap in Google Search Console.
- Validate product structured data with Google's Rich Results Test.
- Test Core Web Vitals on mobile after deployment; target LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.

## Tracking Stack

- Set `ga4MeasurementId` in `marketing-config.js` for GA4.
- Set `metaPixelId` for Meta ads.
- Set `tiktokPixelId` for TikTok ads.
- Set the WhatsApp number in international format, for example `2126XXXXXXXX`.
- When a backend is added, send the same event IDs server-side for Meta Conversions API and TikTok Events API.

## Sales Strategy

- Primary conversion: WhatsApp order request.
- Secondary conversion: form submit.
- Launch audiences: Moroccan women interested in modest fashion, robes, beauty care, skincare, and gift packs.
- Creative angles: price bundle, robe colors, gift-ready box, beach/summer campaign, daily confidence.
- Retarget visitors who watched the video, clicked a color, or started the order form but did not submit.
