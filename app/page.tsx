'use client'

import FileUpload from './components/FileUpload/FileUpload'
import MultistepForm from './components/Form_Wizard/MultistepForm'
import OTPParent from './components/OTP_Input/OTP_Parent'
import TodoParent from './components/TODO_app/Todo_Parent'
import AutComplete from './components/Autcomplete/Autcomplete'
import Pagination from './components/Pagination/Pagination'
import InfiniteScroller from './components/InfiniteScroll/InfiniteScroll'
import MultiSelect from './components/MultiSelect_Input/MultiSelect'
import Accordion from './components/Accordion/Accordion'
import ShoppingCart from './components/Shopping_Cart/ShoppingCart'
import 'bootstrap/dist/css/bootstrap.min.css'
import Context from "./components/Shopping_Cart/context/Context"
import NestedComments from "./components/NestedComments/NestedComments"
import App from "./components/File_Explorer/App"

export default function Home () {
  return (
    <div>
      <MultistepForm />
      <OTPParent />
      <FileUpload />
      <TodoParent />
      <AutComplete />
      <Pagination />
      {/* <InfiniteScroller/> */}
      <MultiSelect />
      <Accordion />
      <Context>
        <ShoppingCart />
      </Context>
      <NestedComments/>
      <App/>
    </div>
  )
}
