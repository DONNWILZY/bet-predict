//src\app\(home)\layout.tsx

import React from "react";
import { MatchPredictionsTable } from "./predict";
import { SportsBar } from "./SportsMenu";

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
     
            {/* <Navbar/>
            <SportsBar />
            <MatchPredictionsTable /> */}
                {children}
            
        </div>
    );
};

export default Layout;