-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 29, 2024 at 07:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs-login`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'alan', 'a222206842@unison.mx', '$2b$10$Q37q9waG7OHrYp5E8nzlsOofrAfaTwTpRHgFeIvnEECKLaaSL0t8O'),
(2, 'i', 'i@i.com', '$2b$10$.6fJ9g7d56C4nxfonrYCmejYEPpHH.Ki.D28WxSCsVybnFZBD4HdC'),
(3, 'a', 'a@a.com', '$2b$10$1ffT3tvevjNS6bTJLTGJLO1SPGy.mQf6kC1iz3gCKj7AQQjlyUPg.'),
(4, 'l', 'l@l.com', '$2b$10$nPfcDj5OYTEYh8wyc3PSa.zo8OPoEw.u98j8R9b0fP4VHFjLgxLf2'),
(5, 'carlos', 'carlos@gmail.com', '$2b$10$ek3H3HYnQMX51YeUHsa08eRwCGOeEy2UguK91UllOZ70jYoG1fMi6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
