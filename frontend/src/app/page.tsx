"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import "./login.css";

export default function Home() {
  return (
    <div
      style={{
        alignContent: "center",
        alignItems: "center",
        background: "var(--prussian-blue-circles)",
        backgroundSize: "1em 1em",
        backgroundColor: "var(--light-reseda-green)",
        opacity: "1",
      }}
      className="w-full h-full absolute"
    >
      <motion.div
        className="loginContainer m-auto w-full md:w-1/2 h-[500px] rounded-lg px-12 py-8 shadow-xl shadow-(color:--ecru)"
        initial={{ opacity: 0, y: 90 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="relative mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 mx-auto flex justify-center"
            style={{ alignItems: "center" }}
          >
            <Image
              src={"/logo-crop-no-bg.png"}
              height={225}
              width={300}
              alt="Workshop Deck"
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-[var(--prussian-blue)] tracking-tight"
          >
            Login
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-3 h-[4px] w-32 md:w-32 bg-gradient-to-r from-[var(--prussian-blue)] via-[var(--reseda-green)] to-[var(--light-reseda-green)] rounded-full mx-auto"
          />

          <motion.form
            action=""
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <input
              type="text"
              name="username"
              id=""
              placeholder="Username"
              className="w-7/8 md:w-3/5 m-auto text-center p-2 rounded-md mt-8"
              style={{ borderBottom: "3px solid var(--prussian-blue)" }}
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              className="w-7/8 md:w-3/5 m-auto text-center p-2 rounded-md mt-8"
              style={{ borderBottom: "3px solid var(--prussian-blue)" }}
            />

            <button
              type="button"
              className="mt-8 bg-(--prussian-blue) w-max px-4 py-2 rounded-md mx-auto font-bold cursor-pointer"
              style={{ color: "var(--floral-white)" }}
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Submit
            </button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
