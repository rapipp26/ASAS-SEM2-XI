import { useState, useEffect, useRef } from "react";
import { useSearch } from "./SearchContext";
import SearchBar from "./SearchBar";
import "../Styles/FetchAndCreateCard.css";

function FetchAndCreateCard() {
  const [users, setUsers] = useState([]); //untuk menyimpan data dari API
  const [loading, setLoading] = useState(true);//untuk menyimpan status loading, awalnya true(lagi loading)
  const [error, setError] = useState("");//untuk menyimpan error jika gagal mengambil data
  const [liked, setLiked] = useState({});//untuk menyimpan status like setiap user
  const [followed, setFollowed] = useState({});//untuk menyimpan status follow setiap user

  const { query } = useSearch();//untuk mengambil query/tekx dari context

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users"); //mengambil data dari API
        if (!response.ok) throw new Error("Gagal mengambil data");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  function toggleLike(id) {
    setLiked((prev) => ({...prev, [id]: !prev[id]}));//menyimpan state like sebelumnya, membalik status setiap diklik
  }

  function toggleFollow(id) {
    setFollowed((prev) => ({...prev, [id]: !prev[id]}))
  }

  //memfilter user dari teks/query search bar
  const filteredUsers = users.filter((user) => {
    const q = query.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) || user.username.toLowerCase().includes(q)
    );
    //ubah query/teks ke huruf kecil, agar mudah pemfilteran
  });

  if(loading) return <p className="status">Mohon tunggu...</p>
  if (error) return <p className="status">{error}</p>

  return (
    <div className="container">
      <h2 className="title">👥 Daftar Pengguna</h2>

      <SearchBar></SearchBar>

      {filteredUsers.length === 0 ? (
        <p className="status">😕 Pengguna "{query}" tidak ditemukan.</p>
      ) : (
        <div className="grid">
          {filteredUsers.map((user) => (
            <div className="card" key={user.id}>

              <div className="avatar">{user.name.charAt(0)}</div>

              <div className="info">
                <p className="name">{user.name}</p>
                <p className="username">@{user.username}</p>
                <p className="detail">📧 {user.email}</p>
                <p className="detail">📍 {user.address.city}</p>
                <p className="detail">🌐 {user.website}</p>
              </div>

              <hr className="divider" />

              <div className="buttonRow">
                {/* mengirim user id ke state like, agar state like tau user mana yang dilike */}
                <button onClick={() => toggleLike(user.id)} 
                className={`button ${liked[user.id] ? "liked" : "notLiked"}`}>
                  {liked[user.id] ? "❤️ Liked" : "🤍 Like"}
                </button>
                <button onClick={() => toggleFollow(user.id)}
                  className={`button ${followed[user.id] ? "followed" : "notFollowed"}`}>
                    {followed[user.id] ? "✅ Following" : "➕ Follow"}
                  </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FetchAndCreateCard;