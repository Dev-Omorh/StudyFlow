import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import FilterButton from "../components/Filter Button";
import NoteCard from "../components/NoteCard";
// import NoteModal from "../components/NoteModal";

function Note() {
  return (
    <>
      <Sidebar />
      <Header />

      <Search />

      <FilterButton />

      <NoteCard />
      <NoteCard />
      <NoteCard />

      {/* <NoteModal /> */}
    </>
  );
}

export default Note;
