import NavigationLink from "./navigation-links"


export default function Navigation({navItems}) {
    return (
    <div>
        {navItems.map((item) => (
        <NavigationLink
          key={item.handle}
          label={item.label}
          handle={item.handle}
          number={item.number}
          className={item.className}
          dotOffsetMobile={item.dotOffsetMobile}
          dotOffsetDesktop={item.dotOffsetDesktop}

        />
      ))}
    </div>
    )
}
