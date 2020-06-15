#include <stdio.h>
#include <stdlib.h>

int find_nbr(int nbr, int *tab)
{
    int i = 0;

    while (tab[i])
    {
        if (tab[i] == nbr)
            return i;
        else
            return 0;
        i++;
    }
    return 0;
}

void sort_int_tab(int *tab)
{
    int i;
    int tmp;
    int count;

    count = 0;

    while (tab[count])
        count++;
    i = 0;
    while (i < count)
    {
        if (tab[i] > tab[i + 1])
        {
            tmp = tab[i];
            tab[i] = tab[i + 1];
            tab[i + 1] = tmp;
            i = -1;
        }
        i++;
    }
}

int main()
{
    float *tab;
    int n, t, i, nbr;

    printf("Enter number: ");
    scanf("%d", &n);
    if (!(tab = malloc(sizeof(float) * n)))
    {
        printf("Memory not allocated.\n");
        return 0;
    }
    for (i = 0; i < 10; i++)
    {
        printf("\nEnter number of elements: ");
        scanf("%d", &t);
        tab[i] = t;
        printf("%d", tab[i]);
    }
    tab[i] = '\0';
    sort_int_tab(tab);
    printf("Enter number for search: ");
    scanf("%d", &nbr);
    int indice = find_nbr(nbr, tab);
    if (indice > 0)
        printf("we found number %d at position %d :", nbr, indice);
    else
        printf("we can't find this number %d in array", nbr);

    return 0;
}

typedef struct s_maison
{

    int Nmaison;
    float area;
    char *adress;
} t_maison;

t_maison update_info(t_maison m, int n)
{

    if (n != null)
        m.Nmaison = n;

    return m;
}

int main(void)
{
    t_maison m;
    t_maison new;
    int n = 5;

    m.Nmaison = 12;
    m.area = 50;
    m.adress = "12 hay ourida taza";
    new = update_info(m, &n);
    printf("N maison est : %d\n", new.Nmaison);
    printf("superficie de la maison est : %d\n", new.area);
    printf(";'adress de la maison maison est : %s\n", new.adress);

    return 0;
}