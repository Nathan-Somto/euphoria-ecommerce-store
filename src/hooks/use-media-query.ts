import { useEffect, useState } from "react"
type Props = {
    mobileBreakpoint?: number
    tabletBreakpoint?: number
    desktopBreakpoint?: number
}
export function useMediaQuery({
    mobileBreakpoint = 768,
    tabletBreakpoint = 1024,
    desktopBreakpoint = 1440

}: Props) {
    const [device, setDevice] = useState<"mobile" | "tablet" | "desktop" | null>(
        null
    )

    useEffect(() => {
        const checkDevice = () => {
            if (window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches) {
                setDevice("mobile")
            } else if (
                window.matchMedia(`(min-width: ${mobileBreakpoint + 1}px) and (max-width: ${tabletBreakpoint}px)`).matches
            ) {
                setDevice("tablet")
            } else {
                setDevice("desktop")
            }
        }

        checkDevice()

        window.addEventListener("resize", checkDevice)

        return () => {
            window.removeEventListener("resize", checkDevice)
        }
    }, [])

    return {
        device,
        isMobile: device === "mobile",
        isTablet: device === "tablet",
        isDesktop: device === "desktop",
    }
}