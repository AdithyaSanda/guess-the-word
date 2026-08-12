import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GuessRow from "../components/GuessRow";
import api from "../services/api";
import Header from "../components/Header";


const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];
function Game() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [letters, setLetters] = useState(["", "", "", "", ""]);
    const [currentPosition, setCurrentPosition] = useState(0);

    const [guesses, setGuesses] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [gameStatus, setGameStatus] = useState("PLAYING");
    const [keyStatus, setKeyStatus] = useState({});

    const handleKeyDown = (e) => {
        if (gameStatus !== "PLAYING" || loading) {
            return;
        }

        const key = e.key.toUpperCase();

        if (/^[A-Z]$/.test(key)) {
            if (currentPosition < 5) {
                const newLetters = [...letters];

                newLetters[currentPosition] = key;

                setLetters(newLetters);
                setCurrentPosition(currentPosition + 1);

                setMessage("");
            }

            return;
        }

        if (e.key === "Backspace") {
            e.preventDefault();

            if (currentPosition > 0) {
                const newLetters = [...letters];

                newLetters[currentPosition - 1] = "";

                setLetters(newLetters);
                setCurrentPosition(currentPosition - 1);

                setMessage("");
            }

            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            submitGuess();
        }
    };

    const handleVirtualKeyPress = (key) => {

    if (gameStatus !== "PLAYING" || loading) {
        return;
    }

    if (/^[A-Z]$/.test(key)) {

        if (currentPosition < 5) {

            const newLetters = [...letters];

            newLetters[currentPosition] = key;

            setLetters(newLetters);

            setCurrentPosition(
                currentPosition + 1
            );

            setMessage("");
        }

        return;
    }

    if (key === "BACKSPACE") {

        if (currentPosition > 0) {

            const newLetters = [...letters];

            newLetters[currentPosition - 1] = "";

            setLetters(newLetters);

            setCurrentPosition(
                currentPosition - 1
            );

            setMessage("");
        }

        return;
    }



    if (key === "ENTER") {

        submitGuess();
    }
};

    const submitGuess = async () => {
        if (currentPosition !== 5) {
            setMessage("Enter all 5 letters before submitting.");
            return;
        }

        const guess = letters.join("");

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post(
                `/api/player/game/${gameId}/guess`,
                {
                    guess: guess
                }
            );

            const data = response.data;

            updateKeyboardStatus(
              data.guess,
              data.result
            );

            setGuesses((previousGuesses) => [
                ...previousGuesses,
                {
                    word: data.guess,
                    result: data.result
                }
            ]);

            setLetters(["", "", "", "", ""]);
            setCurrentPosition(0);

            if (data.status === "WIN") {
                setGameStatus("WIN");
                setMessage(data.message);
            }

            if (data.status === "LOSE") {
                setGameStatus("LOSE");
                setMessage(data.message);
            }

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Unable to submit guess."
            );
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        navigate("/");
    };

    const goToDashboard = () => {
        navigate("/player");
    };

    const updateKeyboardStatus = (word, result) => {

    setKeyStatus((previousStatus) => {

        const updatedStatus = {
            ...previousStatus
        };

        word.split("").forEach((letter, index) => {

            const newStatus = result[index];

            const currentStatus =
                updatedStatus[letter];


           
            if (newStatus === "G") {

                updatedStatus[letter] = "G";

            }

            
            else if (
                newStatus === "O" &&
                currentStatus !== "G"
            ) {

                updatedStatus[letter] = "O";

            }

            
            else if (
                newStatus === "X" &&
                !currentStatus
            ) {

                updatedStatus[letter] = "X";
            }

        });

        return updatedStatus;
    });
};

    return (
        <div
            className="min-h-screen bg-[#181818] text-white"
            onClick={() => inputRef.current?.focus()}
        >

            <Header />

            <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-8">
                <div className="mt-4 flex flex-col gap-2">

                  <div className="flex flex-col gap-2 items-center">
                    {[0,1,2,3,4].map((rowIndex) => {
                      if(rowIndex < guesses.length) {
                        return (<GuessRow
                            key={rowIndex}
                            word={guesses[rowIndex].word}
                            result={guesses[rowIndex].result}
                          />
                        )
                      }

                      if(rowIndex === guesses.length) {
                        return (<CurrentGuessRow 
                            key={rowIndex}
                            letters={letters}
                            currentPosition={currentPosition}
                          />
                        )
                      }

                      return (
                          <EmptyGuessRow 
                              key={rowIndex}
                          />
                      )
                    })}
                  </div>

                    
                  <Keyboard
                      keyStatus={keyStatus}
                      onKeyPress={handleVirtualKeyPress}
                      disabled={gameStatus !== "PLAYING" || loading}
                  />
                  
                    
                </div>


                {gameStatus === "PLAYING" && (
                    <input
                        ref={inputRef}
                        type="text"
                        className="absolute h-0 w-0 opacity-0"
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                )}


           
                {message && gameStatus === "PLAYING" && (
                    <div
                        className="
                            mt-5
                            rounded-lg
                            bg-red-50
                            px-4 py-2
                            text-sm
                            font-medium
                            text-red-600
                        "
                    >
                        {message}
                    </div>
                )}
            </main>

            {gameStatus !== "PLAYING" && (
                <GameResultModal
                    gameStatus={gameStatus}
                    message={message}
                    onOK={goToDashboard}
                />
            )}
        </div>
    );
}

function CurrentGuessRow({ letters, currentPosition }) {

    return (
        <div className="flex gap-2">

            {letters.map((letter, index) => (

                <div
                    key={index}
                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        border-2
                        border-[#3a3a3c]
                        text-2xl
                        font-bold
                        sm:h-16
                        sm:w-16
                        sm:text-3xl

                        ${
                            letter && "border-[#565758]"
                        }
                    `}
                >
                    {letter}
                </div>

            ))}

        </div>
    );
}


function EmptyGuessRow() {

    return (
        <div className="flex gap-2">

            {[0, 1, 2, 3, 4].map((index) => (

                <div
                    key={index}
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        border-2
                        border-[#3a3a3c]
                        text-2xl
                        font-bold
                        sm:h-16
                        sm:w-16
                        sm:text-3xl
                    "
                >
                </div>

            ))}

        </div>
    );
}


function Keyboard({
    keyStatus,
    onKeyPress,
    disabled
}) {

    return (
        <div className="mt-7 flex w-full flex-col items-center gap-2">

            {KEYBOARD_ROWS.map((row, rowIndex) => (

                <div
                    key={rowIndex}
                    className="flex justify-center gap-1.5"
                >

                    {row.map((key) => (

                        <KeyboardKey
                            key={key}
                            value={key}
                            status={keyStatus[key]}
                            onClick={() => onKeyPress(key)}
                            disabled={disabled}
                        />

                    ))}

                </div>

            ))}

        </div>
    );
}

function KeyboardKey({
    value,
    status,
    onClick,
    disabled
}) {

    const getBackground = () => {

        if (status === "G") {
            return "bg-green-600 border-green-600";
        }

        if (status === "O") {
            return "bg-[#b59f3b] border-[#b59f3b]";
        }

        if (status === "X") {
            return "bg-[#3a3a3c] border-[#3a3a3c]";
        }

        return "bg-[#818384] border-[#818384]";
    };


    const wideKey =
        value === "ENTER" ||
        value === "BACKSPACE";


    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`
                flex
                h-12
                items-center
                justify-center
                rounded-md
                border
                text-sm
                font-bold
                text-white
                transition
                active:scale-95

                ${
                    wideKey
                        ? "w-16 sm:w-20"
                        : "w-8 sm:w-10"
                }

                ${getBackground()}

                ${
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:brightness-110"
                }
            `}
        >
            {value === "BACKSPACE"
                ? "⌫"
                : value
            }
        </button>
    );
}

function GameResultModal({
    gameStatus,
    message,
    onOK
}) {

    const won = gameStatus === "WIN";

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/60
                px-4
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-xl
                    bg-[#181818]
                    border-2
                    border-[#3a3a3c]
                    p-8
                    text-center
                    shadow-2xl
                "
            >

                

                <div className="mb-4 text-5xl">
                    {won ? "🎉" : "😔"}
                </div>


               

                <h2
                    className={`
                        text-2xl
                        font-bold

                        ${
                            won
                                ? "text-green-600"
                                : "text-white"
                        }
                    `}
                >
                    {won
                        ? "Congratulations!"
                        : "Better Luck Next Time!"
                    }
                </h2>


      

                <p className="mt-3 text-gray-500">
                    {message}
                </p>


           

                <button
                    onClick={onOK}
                    className="
                        mt-6
                        rounded-lg
                        bg-[#181818]
                        border
                        border-white
                        px-10
                        py-2.5
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#3a3a3c]
                        active:scale-95
                    "
                >
                    OK
                </button>

            </div>

        </div>
    );
}

export default Game