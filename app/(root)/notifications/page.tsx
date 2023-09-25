import Header from "@/components/shared/Main/Header";
import NotificationFeed from "@/components/modals/NotificationFeed";

export default function Search() {
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationFeed />
    </>
  );
}
