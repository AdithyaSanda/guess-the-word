function GuessRow({ word, result }) {

    return (
        <div className="flex gap-2">

            {word.split("").map((letter, index) => {

                const status = result[index];

                return (
                    <div
                        key={index}
                        className={`
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            border-2
                            text-2xl
                            font-bold
                            text-white
                            sm:h-16
                            sm:w-16
                            sm:text-3xl

                            ${
                                status === "G"
                                    ? "border-green-600 bg-green-600"
                                    : status === "O"
                                        ? "border-[#b59f3b] bg-[#b59f3b]"
                                        : "border-[#3a3a3c] bg-[#3a3a3c]"
                            }
                        `}
                    >
                        {letter}

                    </div>
                );
            })}

        </div>
    );
}


export default GuessRow