export async function getCountryCode(req: Request) {
    try {
        const ip =
            process.env.NODE_ENV === 'development'
                ? '102.89.45.12'
                : req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
                req.headers.get('x-real-ip') ??
                (req as any).ip;

        if (!ip) return 'US';

        const geoRes = await fetch(`https://api.ip2location.io/?key=${process.env.IP_GEOLOCATION_API_KEY}&ip=${ip}`);
        const geoData = await geoRes.json();
        console.log("url hit: ", geoRes.url)
        console.log('GeoIp data: ', JSON.stringify(geoData, null, 2));
        return geoData?.country_code as string || 'US';
    } catch (err) {
        console.error('GeoIP lookup failed:', err);
        return 'US';
    }
}
