import { Appbar } from "../components/Appbar";
import { BalanceComponent } from "../components/BalanceComponent";
import { Users } from "../components/UsersComponent";

function Dashboard() {
  return (
    <div>
      <Appbar />
      <BalanceComponent />
      <Users />
    </div>
  );
}

export default Dashboard;
