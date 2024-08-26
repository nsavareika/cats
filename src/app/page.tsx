import fetchCats from "../actions/fetchCats";
import CatGallery from "../components/CatGallery";

export default async function Home() {
  const cats = await fetchCats({ pageParam: 1 });
  return (
    <main>
      <CatGallery cats={cats} />
    </main>
  );
}
