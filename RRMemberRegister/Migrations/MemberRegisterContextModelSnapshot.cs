﻿// <auto-generated />
using System;
using MemberRegister.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace RRMemberRegister.Migrations
{
    [DbContext(typeof(MemberRegisterContext))]
    partial class MemberRegisterContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MemberRegister.Models.Member", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Adress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Efternamn")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fornamn")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Postnummer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Postort")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Senastuppdateraddatum")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Skapatdatum")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Members");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Adress = "Adress 1",
                            Efternamn = "Efternamn 1",
                            Fornamn = "Fornamn 1",
                            Postnummer = "111111",
                            Postort = "Postort 1",
                            Senastuppdateraddatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385),
                            Skapatdatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385)
                        },
                        new
                        {
                            Id = 2,
                            Adress = "Adress 2",
                            Efternamn = "Efternamn 2",
                            Fornamn = "Fornamn 2",
                            Postnummer = "222222",
                            Postort = "Postort 2",
                            Senastuppdateraddatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385),
                            Skapatdatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385)
                        },
                        new
                        {
                            Id = 3,
                            Adress = "Adress 3",
                            Efternamn = "Efternamn 3",
                            Fornamn = "Fornamn 3",
                            Postnummer = "33333",
                            Postort = "Postort 3",
                            Senastuppdateraddatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385),
                            Skapatdatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385)
                        },
                        new
                        {
                            Id = 4,
                            Adress = "Adress 4",
                            Efternamn = "Efternamn 4",
                            Fornamn = "Fornamn 4",
                            Postnummer = "44444",
                            Postort = "Postort 4",
                            Senastuppdateraddatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385),
                            Skapatdatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385)
                        },
                        new
                        {
                            Id = 5,
                            Adress = "Adress 5",
                            Efternamn = "Efternamn 5",
                            Fornamn = "Fornamn 5",
                            Postnummer = "55555",
                            Postort = "Postort 5",
                            Senastuppdateraddatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385),
                            Skapatdatum = new DateTime(2020, 9, 2, 21, 5, 19, 348, DateTimeKind.Local).AddTicks(6385)
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
