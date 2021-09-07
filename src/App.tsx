import { Container } from "@material-ui/core";
import { TaskForm } from "./features/Tasks/TaskForm.component";
import { TasksList } from "./features/Tasks/TasksList.Component";

function App() {

  return (
    <Container maxWidth='md'>
      < TaskForm />
      < TasksList />
    </Container>
  );
}

export default App;
