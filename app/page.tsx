"use client"

import FileUpload from "./components/FileUpload/FileUpload";
import MultistepForm from "./components/Form_Wizard/MultistepForm";
import OTPParent from "./components/OTP_Input/OTP_Parent";
import TodoParent from "./components/TODO_app/Todo_Parent";
import AutComplete from "./components/Autcomplete/Autcomplete";
import Pagination from './components/Pagination/Pagination';

export default function Home() {
  return (
    <div>
      <MultistepForm/>
      <OTPParent/>
      <FileUpload/>
      <TodoParent/>
      <AutComplete/>
      <Pagination/>
    </div>
  );
}
