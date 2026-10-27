async function check() {
  const res = await fetch("http://localhost:3000/portfolio");
  const html = await res.text();
  console.log("Includes 'Test'?", html.includes("Test"));
  const matches = html.match(/https:\/\/coksxzifntucyotsarvs[^\s"']+/g);
  console.log("Found Supabase image matches:", matches);
}
check();
