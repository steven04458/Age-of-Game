import BarreNav from './components/Barre-nav/Barre-nav'
import BlockJeux from './components/block-jeux/block-jeux'
import './App.css'

function App() {

  return (
    <>
      <BarreNav></BarreNav>
      <div className='content'>
        <BlockJeux></BlockJeux>
        <BlockJeux></BlockJeux>
        <BlockJeux></BlockJeux>
        <BlockJeux></BlockJeux>
        <BlockJeux></BlockJeux>
      </div>
    </>
  )
}

export default App

