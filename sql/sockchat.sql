-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 23 mai 2019 à 12:45
-- Version du serveur :  5.7.21
-- Version de PHP :  5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sockchat`
--

-- --------------------------------------------------------

--
-- Structure de la table `ami`
--

DROP TABLE IF EXISTS `ami`;
CREATE TABLE IF NOT EXISTS `ami` (
  `nickname` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `membres`
--

DROP TABLE IF EXISTS `membres`;
CREATE TABLE IF NOT EXISTS `membres` (
  `nickname` varchar(40) NOT NULL,
  `mdp` varchar(40) NOT NULL,
  `mail` varchar(40) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `membres`
--

INSERT INTO `membres` (`nickname`, `mdp`, `mail`) VALUES
('Samsam', 'samsamsam', 'samroesch91@gmail.com'),
('sam', 'a', 'a'),
('b', 'b', 'b'),
('samsam', 'samsamsam', 'jaimelespizza@gmail.com'),
('zefzefzef', 'ohnzueifbojheifrzueibgohyf', 'zueifhnuipojhzefuipojhrzefg@gmail.com'),
('gdzadzadaz', 'dazdazdazdaz', 'gdazdazdaz@gmail.com'),
('gdzadzadaz', 'dazdazdazdaz', 'gdazdazdaz@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `message` varchar(1000) NOT NULL,
  `deLaPart` varchar(50) NOT NULL,
  `Pour` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`message`, `deLaPart`, `Pour`) VALUES
('fze', 'sam', 'Samsam'),
('fze', 'sam', 'Samsam'),
('fezfze', 'sam', 'Samsam'),
('fze', 'sam', 'Samsam'),
('daz', 'sam', 'Samsam'),
('daz', 'Sam', 'Samsam'),
('daz', 'sam', 'Samsam'),
('sa', 'sam', 'Samsam'),
('Salut toi ;)', 'Samsam', 'sam');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
