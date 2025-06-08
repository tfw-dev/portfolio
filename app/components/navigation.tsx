import NavigationLink from "./navigation-links"

export default function Navigation() {
    return (
    <div>
        <NavigationLink label="About" handle="about" style={{ position: 'fixed', top: '144px', right: '55%' }}
number="01"></NavigationLink>
        <NavigationLink label="Portfolio" handle="portfolio" style={{ position: 'fixed', top: '254px', right: '30%' }}
number="02"></NavigationLink>
        <NavigationLink label="Contact" handle="contact" style={{ position: 'fixed', top: '733px', right: '30%' }}
number="03"></NavigationLink>
    </div>
    )
}
