import { Center } from "@chakra-ui/react";
import AddItem from "../components/item-configuration/add-item";


export default function Home() {

  return (
    <div>
      <main>
        <Center h="100vh">
         <AddItem />
        </Center>
      </main>
    </div>
  );
}
