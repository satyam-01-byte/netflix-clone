import { XMarkIcon, PlusIcon, HandThumbUpIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import MuiModal from "@mui/material/Modal"
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import { Element, Genre } from "../typings";

function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [movie, setMovie] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState("");
    const [genres, setGenres] = useState<Genre[]>([])
    const [muted, setMuted] = useState(false)

    useEffect(() => {
        if(!movie) return;

        async function fetchMovie() {
            const data = await fetch(`https://api.themoviedb.org/3/${movie?.media_type === "tv" ? "tv" : "movie"}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`)
            .then((response) => response.json())

            if(data?.videos) {
                const index  = data.videos?.results?.findIndex((element: Element) => element.type === "Trailer")
                setTrailer(data.videos?.results[index]?.key);
                if(data?.genres) setGenres(data.genres)
            }
        }

        fetchMovie();
    }, [movie])

    const handleClose = () => {
        setShowModal(false);
    }

  return (
    <MuiModal open={showModal} onClose={handleClose} className="fixed !top-7 left-0 right-0 z-50 w-full mx-auto max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
        <>
            <button onClick={handleClose} className="modalButton absolute top-5 right-5 bg-[#181818] hover:bg-[#181818] !z-40 border-none h-9 w-9">
                <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="relative pt-[56.25%]">
                <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="100%"
                style={{position: "absolute", top: "0", left: "0"}}
                playing
                muted={muted}
                />

                <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                    <div className="flex space-x-2">
                        <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                            <FaPlay className="h-7 w-7 text-black"/>
                            Play
                        </button>

                        <button className="modalButton">
                            <PlusIcon className="h-7 w-7"/>
                        </button>

                        <button className="modalButton">
                            <HandThumbUpIcon className="h-7 w-7"/>
                        </button>
                    </div>
                    <button className="modalButton" onClick={() => setMuted(!muted)}>
                        {muted ? <SpeakerXMarkIcon className="h-6 w-6" /> : <SpeakerWaveIcon className="h-6 w-6" /> }
                    </button>
                </div>
            </div>

            <div className="rounded-b-md bg-[#181818] p-8">
                <p className="space-x-2 pb-4">
                    <span className="text-green-400 font-semibold">{Math.floor(movie?.vote_average*10)}% Match</span>
                    <span className="font-light">{movie?.first_air_date || movie?.release_date}</span>
                    <span className="border-2 border-white/40 rounded px-2">HD</span>
                </p>
                <div className="md:flex md:justify-between gap-x-4">
                    <h3 className="text-md md:text-lg md:w-3/4 pb-4">{movie?.overview}</h3>
                    <div>
                        <p className="text-[gray] pb-3">Genres: <span className="text-white">{genres.map(genre => genre.name).join(', ')}</span></p>
                        <p className="text-[gray] pb-3">Original language: <span className="text-white">{movie?.original_language}</span></p>
                        <p className="text-[gray]">Total votes: <span className="text-white">{movie?.vote_count}</span></p>
                    </div>
                </div>
            </div>
        </>
    </MuiModal>
  )
}

export default Modal