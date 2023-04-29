import { Button } from "@/components/ui/Button";

import { NextPage } from "next";

interface Props {}

const Dashboard: NextPage<Props> = ({}) => {
  return (
    <>

      <main>
        <div className="mx-auto container py-6 sm:px-6 lg:px-8">
            <div className="py-4 px-8 flex border justify-between items-center rounded-md">
                <h2>Welocome to gossipgeeks</h2> 
                <Button>Complete Now</Button>
            </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;