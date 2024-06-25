"use client";

import useUserInfoMutation from "@/hooks/mutation/useUserInfoMutation";
import DarkToggle from "@/components/common/DarkToggle";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import useLogout from "@/hooks/useLogout";
import Link from "next/link";

export default function Sidebar() {
  const logout = useLogout();
  const pathname = usePathname();
  const [nickname, setNickname] = useState("");
  const { mutate, data, error } = useUserInfoMutation();

  useEffect(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (data) {
      setNickname(data.nickname);
    }
  }, [data]);

  const isActive = (path: any) => {
    return pathname === path ? styles.active : "";
  };

  const isLogout = () => {
    logout();
  };

  return (
    <>
      <div id="sidebar" className={styles.sidebar}>
        <div className="flex flex-col items-center mb-4">
          <span className="text-lg font-semibold mt-2">
            {nickname ? nickname : "Loading..."}
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <DarkToggle />
          <button
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100"
            onClick={() => isLogout()}
          >
            로그아웃
          </button>
        </div>

        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${isActive("/save/main")}`}>
            <Link href="/save/main" className={styles.navLink}>
              Main
            </Link>
          </li>
          <li className={`${styles.navItem} ${isActive("/save/chzzk")}`}>
            <Link href="/save/chzzk" className={styles.navLink}>
              Chzzk
            </Link>
          </li>
          <li className={`${styles.navItem} ${isActive("/save/my-info")}`}>
            <Link href="/save/my-info" className={styles.navLink}>
              MyInfo
            </Link>
          </li>
          <li className={`${styles.navItem} ${isActive("/404")}`}>
            <Link href="/404" className={styles.navLink}>
              404
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
