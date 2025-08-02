export function Footer() {
  return (
    <footer className="border-t-united-nations-blue/10 border-t">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between p-4 text-xs xl:px-0">
        <p className="text-muted-foreground">Товары предоставляет самозанятый — ИНН 520300699820</p>
        <p className="text-muted-foreground">{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
