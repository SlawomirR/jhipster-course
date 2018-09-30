package io.github.slawomirr.repository;

import io.github.slawomirr.domain.Speaker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Speaker entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpeakerRepository extends JpaRepository<Speaker, Long> {

    @Query(value = "select distinct speaker from Speaker speaker left join fetch speaker.sessions",
        countQuery = "select count(distinct speaker) from Speaker speaker")
    Page<Speaker> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct speaker from Speaker speaker left join fetch speaker.sessions")
    List<Speaker> findAllWithEagerRelationships();

    @Query("select speaker from Speaker speaker left join fetch speaker.sessions where speaker.id =:id")
    Optional<Speaker> findOneWithEagerRelationships(@Param("id") Long id);

}
