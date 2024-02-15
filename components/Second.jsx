"use client"
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Example = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTextVisible(true); // Set the state to make the text visible after 1 second
    }, 3500);

    return () => clearTimeout(timeout); // Cleanup function
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="grid  place-content-center  p-1">
      {isTextVisible && <EncryptButton />}
    </div>
  );
};

const TARGET_TEXT = "OR a Story";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#<>/?#$%^";

const EncryptButton = () => {
  const intervalRef = useRef(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
    setIsScrambling(false); // Reset scrambling state
  };

  useEffect(() => {
    if (text === TARGET_TEXT) {
      scramble(); // Start the encryption process after the text is visible
    }
  }, [text]); // Run when the text changes

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="group relative overflow-hidden rounded-lg px-4 py-2 font-mono font-medium uppercase text-slate-300 transition-colors hover:text-indigo-300"
    >
      <div className="relative z-10 flex items-center gap-2">
        <span>{text}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default Example;
