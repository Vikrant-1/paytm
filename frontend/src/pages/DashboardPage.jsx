import { Appbar } from "../components/Appbar";
import { BalanceComponent } from "../components/BalanceComponent";
import { Users } from "../components/UsersComponent";

function Dashboard() {
  return (
    <div>
      <Appbar />
      <BalanceComponent value={"Rs 10,000"} />
      <Users />
    </div>
  );
}

export default Dashboard;
