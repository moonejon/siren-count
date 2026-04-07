import { AbsoluteCenter } from "@chakra-ui/react";
import AddItem from "../components/item-configuration/add-item";


export default function Home() {

  return (
    <div>
      <main>
        <AbsoluteCenter>
         <AddItem />
        </AbsoluteCenter>
      </main>
    </div>
  );
}
