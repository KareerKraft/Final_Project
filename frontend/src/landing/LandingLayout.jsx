import Header from "./components/Header"

function LandingLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default LandingLayout