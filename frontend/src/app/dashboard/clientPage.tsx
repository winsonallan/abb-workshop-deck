"use client";

import PageTitle from "@/components/PageTitle";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function DashboardContent() {
  const { isOpen } = useSidebar(); // ✅ Access context here

  return (
    <div className="flex">
      <Sidebar />
      <main
        className={`transition-all duration-300 ${
          isOpen ? "mt-1 px-4" : "mt-10 px-10"
        } py-6`}
      >
        <PageTitle text="Dashboard"></PageTitle>
        <div className={`mainContent ${isOpen ? "px-4" : "px-0 pt-4"}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
          imperdiet ante. Proin pharetra vestibulum urna, a accumsan ipsum
          varius quis. Phasellus tortor ligula, facilisis vel scelerisque et,
          semper vitae mi. Integer ante diam, molestie eu consectetur eget,
          pharetra sit amet felis. Maecenas nec auctor dolor, at ornare velit.
          Sed aliquet auctor gravida. Fusce lacus erat, egestas in accumsan non,
          congue in lectus. Donec laoreet laoreet nulla, vel egestas sapien
          euismod non. Donec quis mi augue. Nunc orci elit, lacinia porta
          porttitor vel, viverra non odio. Sed efficitur, odio id condimentum
          tempus, odio augue iaculis ipsum, eu semper nulla diam vel massa. Duis
          mattis varius venenatis. Aliquam erat volutpat. Integer condimentum
          rutrum diam, vitae tristique ante elementum iaculis. Integer porta
          purus sit amet rutrum molestie. Sed consectetur arcu finibus,
          vestibulum neque et, aliquam magna. Pellentesque imperdiet, arcu ac
          cursus elementum, dui nisl fringilla odio, et semper nunc justo et
          tellus. Donec vel eleifend mi, quis porta eros. Donec tempor ex sit
          amet tellus lobortis, nec consequat metus malesuada. Nulla malesuada
          ex ut pellentesque commodo. Proin sit amet felis eu ipsum semper
          fermentum eu at dui. Donec consequat, elit eget rutrum cursus, diam
          metus accumsan ante, quis mattis justo arcu id leo. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Curabitur laoreet eros a justo posuere, quis luctus massa
          finibus. Nunc orci augue, condimentum at feugiat at, condimentum non
          lacus. Nulla sapien elit, mattis sit amet felis ac, eleifend finibus
          tellus. Praesent ornare dolor nec nisl luctus, eu ultrices risus
          tempus. Ut a neque vel diam venenatis dignissim. Vestibulum risus
          mauris, bibendum in suscipit egestas, sodales vitae mauris. Vestibulum
          tempor, eros quis volutpat blandit, ipsum arcu dapibus felis, eu
          luctus enim est a nisi. Cras eu enim vitae augue dapibus tincidunt
          eget faucibus justo. Duis vitae tortor aliquet, tempor lorem eget,
          tempus dui. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Cras tortor
          felis, egestas in maximus nec, sollicitudin quis tortor. Quisque
          libero purus, rutrum et pulvinar a, hendrerit congue massa. Nulla nec
          tempor eros, at aliquet dolor. Nunc eleifend commodo est, dignissim
          faucibus dui tincidunt quis. Integer sit amet ullamcorper neque.
          Praesent urna nulla, dictum non massa in, mollis congue nulla. In ac
          ex odio. Integer non arcu sed neque interdum rhoncus eu at lectus.
          Nulla a lectus ut libero suscipit malesuada. Phasellus eu est diam.
          Phasellus ligula dolor, sollicitudin non nisl in, sagittis finibus
          libero. Mauris sed velit interdum, cursus ligula sed, dignissim diam.
          Ut et venenatis nisi, eu sodales eros. Fusce ligula sapien, euismod
          sed pretium vitae, scelerisque sed mauris. Donec nisi sapien, interdum
          eu faucibus non, dictum eu mauris. Vestibulum pharetra dolor augue, eu
          semper dolor molestie tincidunt. Praesent sit amet sapien vel felis
          commodo gravida. Praesent ut nisl suscipit, interdum orci eu,
          porttitor erat. Pellentesque habitant morbi tristique senectus et
          netus et malesuada fames ac turpis egestas. Donec finibus risus nec
          arcu porta, et malesuada neque pretium. Nulla mattis mi ac dolor
          iaculis condimentum. Vestibulum facilisis dui quis justo feugiat
          pulvinar. Quisque sagittis nibh condimentum posuere sollicitudin.
          Etiam sollicitudin ultricies lectus ut porta. Vestibulum imperdiet
          nisi sed euismod vehicula.
        </div>
      </main>
    </div>
  );
}

export default function DashboardClient() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}
