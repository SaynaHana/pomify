﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Pomodoro.Migrations
{
    [DbContext(typeof(UserDb))]
    [Migration("20250101210022_InitialCreateWeb")]
    partial class InitialCreateWeb
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Pomodoro.Models.DailyUserData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Date")
                        .HasColumnType("longtext");

                    b.Property<int>("TimeSpent")
                        .HasColumnType("int");

                    b.Property<string>("Uid")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("DailyUsers");
                });

            modelBuilder.Entity("Pomodoro.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("MaxStreak")
                        .HasColumnType("int");

                    b.Property<int>("Streak")
                        .HasColumnType("int");

                    b.Property<int>("StreakThreshold")
                        .HasColumnType("int");

                    b.Property<int>("TimeSpent")
                        .HasColumnType("int");

                    b.Property<string>("Uid")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}