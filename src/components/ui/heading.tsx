
  
  export function Heading({title, description}: HeadingProps) {
    return ( 
      <header>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </header>
    )
  };