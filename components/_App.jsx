// Root composition — rendered last, after every component global is defined.
// Edit freely; `node _tools/build.mjs` (or the pre-commit hook) recompiles app.bundle.js.
const App = () => (
  <>
    <Nav/>
    <Hero/>
    <TrustBar/>
    <Manifesto/>
    <Staff/>
    <Program/>
    <Materials/>
    <Proof/>
    <Pricing/>
    <Team/>
    <FAQ/>
    <FinalCTA/>
    <Footer/>
  </>
);
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
