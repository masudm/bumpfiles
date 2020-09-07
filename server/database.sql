CREATE DATABASE bumpfiles;

CREATE TABLE `bumpfiles`.`connections` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `timestamp` BIGINT NOT NULL,
  `ip` VARCHAR(15) NULL,
  `location` POINT NULL,
  `device` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`, `timestamp`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;
